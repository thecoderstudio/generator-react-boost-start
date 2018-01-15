FROM node:8.2.1
MAINTAINER Code R (techteam@coderstudio.nl)

# Expose port
ENV PORT 1234
EXPOSE 1234

# Override the base log level (info).
ENV NPM_CONFIG_LOGLEVEL warn

# Create workdir
RUN mkdir -p <%= projectName %>
WORKDIR /<%= projectName %>

# Add yarn repo
RUN apt-get update
RUN apt-get install -y \
    curl \
    apt-transport-https
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

# Update and install dependencies
RUN apt-get update
RUN apt-get install -y \
    yarn
RUN yarn global add serve

# Install dependencies
COPY package.json package.json
RUN NODE_ENV=development yarn

# Copy project files into image
COPY . .

RUN yarn run build

CMD ["yarn", "run", "start:prod"]
