#
# `ultimate-seed` Dockerfile
#
# https://github.com/pilwon/ultimate-seed
#

# Pull base image.
FROM dockerfile/nodejs

# Install requirements.
RUN npm install -g bower
RUN npm install -g grunt-cli

# Add app directory.
ADD . /app

# Install `ultimate-seed`.
RUN cd /app && bower install --allow-root
RUN cd /app && npm install --unsafe-perm
RUN cd /app && grunt build

# Define environment variables
ENV NODE_ENV production
ENV PORT 80

# Define default command.
CMD ["node", "/app/server"]

# Expose ports.
EXPOSE 80
