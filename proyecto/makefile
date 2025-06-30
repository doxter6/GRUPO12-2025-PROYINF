# Variables generales
IMAGE_NAME = proyecto

DB_USER ?= postgres
DB_PASSWORD ?= postgres
DB_PORT_HOST ?= 5432
BACKEND_PORT_HOST ?= 3001
APP_PORT_HOST ?= 5173

# Variables dinámicas
BRANCH = $(shell git rev-parse --abbrev-ref HEAD | sed 's|/|-|g')
CONTAINER_NAME = proyecto-app-$(BRANCH)
NETWORK_NAME = proyecto-net

export DB_USER DB_PASSWORD DB_PORT_HOST BACKEND_PORT_HOST APP_PORT_HOST

# Dependencias
BACKEND_DEPS = express cors pg sequelize dotenv axios
FRONTEND_DEPS = react react-dom react-router-dom axios vite @vitejs/plugin-react

.PHONY: build build-backend build-frontend run run-db run-backend run-frontend stop install-deps clean clean-all help

# ----------------------------
# Construcción de imágenes
# ----------------------------

build: build-backend build-frontend

build-backend:
	@echo "Construyendo imagen del backend..."
	docker build -t $(IMAGE_NAME)-backend -f server/Dockerfile ./server

build-frontend:
	@echo "Construyendo imagen del frontend..."
	docker build -t $(IMAGE_NAME)-frontend -f cliente/Dockerfile ./cliente

# ----------------------------
# Ejecución de contenedores
# ----------------------------

run: network run-db run-backend run-frontend
	@echo "Aplicación iniciada en rama '$(BRANCH)'"
	@echo "* Frontend: http://localhost:$(APP_PORT_HOST)"
	@echo "* Backend: http://localhost:$(BACKEND_PORT_HOST)"
	@echo "* PostgreSQL: localhost:$(DB_PORT_HOST)"

network:
	@docker network inspect $(NETWORK_NAME) >/dev/null 2>&1 || docker network create $(NETWORK_NAME)

run-db: network
	@echo "Iniciando PostgreSQL..."
	@docker run -d --name db-$(CONTAINER_NAME) \
		--network $(NETWORK_NAME) \
		-e POSTGRES_USER=$(DB_USER) \
		-e POSTGRES_PASSWORD=$(DB_PASSWORD) \
		-e POSTGRES_DB=myapp \
		-p $(DB_PORT_HOST):5432 \
		-v postgres_data:/var/lib/postgresql/data \
		postgres:15
	@sleep 2  # Espera breve para inicialización

run-backend: build-backend network
	@echo "Iniciando backend..."
	@docker run -d --name backend-$(CONTAINER_NAME) \
		--network $(NETWORK_NAME) \
		-e DATABASE_URL="postgres://$(DB_USER):$(DB_PASSWORD)@db-$(CONTAINER_NAME):5432/myapp" \
		-p $(BACKEND_PORT_HOST):3001 \
		$(IMAGE_NAME)-backend

run-frontend: build-frontend network
	@echo "Iniciando frontend con HOT RELOAD..."
	@docker run -d --name frontend-$(CONTAINER_NAME) \
		--network $(NETWORK_NAME) \
		-e CHOKIDAR_USEPOLLING=true \
		-v $(shell pwd)/cliente/src:/app/src \
		-v $(shell pwd)/cliente/index.html:/app/index.html \
		-v $(shell pwd)/cliente/vite.config.js:/app/vite.config.js \
		-p $(APP_PORT_HOST):5173 \
		$(IMAGE_NAME)-frontend

# ----------------------------
# Gestión de contenedores
# ----------------------------

stop:
	@echo "Deteniendo contenedores..."
	@docker stop db-$(CONTAINER_NAME) backend-$(CONTAINER_NAME) frontend-$(CONTAINER_NAME) 2>/dev/null || true
	@echo "Usa 'make run' para reiniciar"

# ----------------------------
# Instalación de dependencias
# ----------------------------

install-deps: install-backend install-frontend

install-backend:
	@echo "Instalando dependencias del backend..."
	@cd server && npm install $(BACKEND_DEPS)

install-frontend:
	@echo "Instalando dependencias del frontend..."
	@cd cliente && npm install $(FRONTEND_DEPS)

# ----------------------------
# Limpieza
# ----------------------------

clean:
	@echo "Eliminando contenedores..."
	@docker rm -f db-$(CONTAINER_NAME) backend-$(CONTAINER_NAME) frontend-$(CONTAINER_NAME) 2>/dev/null || true

clean-all: clean
	@echo "Eliminando imágenes, volúmenes y red..."
	@docker rmi -f $(IMAGE_NAME)-backend $(IMAGE_NAME)-frontend 2>/dev/null || true
	@docker volume rm -f postgres_data 2>/dev/null || true
	@docker network rm $(NETWORK_NAME) 2>/dev/null || true
	@echo "Limpieza completa"

# ----------------------------
# Ayuda
# ----------------------------

help:
	@echo "Opciones disponibles:"
	@echo "  make build        - Construye todas las imágenes Docker"
	@echo "  make run          - Inicia toda la aplicación (con hot reload)"
	@echo "  make stop         - Detiene contenedores sin eliminarlos"
	@echo "  make install-deps - Instala dependencias localmente"
	@echo "  make clean        - Elimina contenedores"
	@echo "  make clean-all    - Elimina contenedores, imágenes y volúmenes"
	@echo "  make help         - Muestra esta ayuda"