#
# ultimate-seed Dockerfile
#
# https://github.com/pilwon/ultimate-seed
#

# Pull base image.
FROM dockerfile/nodejs

# Install tools
RUN npm install -g bower grunt-cli

# Add app directory.
ADD . /app

# Install `ultimate-seed`.
RUN \
  cd /app && \
  npm prune --production && \
  npm install --production --unsafe-perm && \
  npm rebuild

# Define environment variables
ENV NODE_ENV production
ENV PORT 80

# Define working directory.
WORKDIR /app

# Define default command.
CMD ["node", "server"]

# Expose ports.
EXPOSE 6379
