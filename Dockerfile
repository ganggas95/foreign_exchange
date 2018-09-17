# The build process

# Build docker with node:8.9.0
FROM node:8.9.0 as build-deps

ENV NPM_CONFIG_LOGLEVEL warn

# Add build args with params app_env
# You can use this build args by add ex: docker build . --build-arg app_env=production/development
ARG app_env

# Set new docker environment by app_env params
ENV APP_ENV $app_env

# Copy all file project to docker workdir
COPY . . 

# Run npm install to install all dependencies
RUN npm install

# Run cmd
# If APP_ENV == production; run npm install -g serve and build webpack project
# and cd dist and run serve -s to start node server
# Else npm run start to start with development mode
CMD if [ ${APP_ENV} = production ]; \
	then \
	npm install -g serve && \
	npm run build && \
	cd dist && \
	serve -s ./; \
	else \
	npm run start; \
	fi

# Tell docker about the app listened at port 5000
EXPOSE 5000
