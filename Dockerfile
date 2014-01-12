#
# `ultimate-seed` Dockerfile
#
# https://github.com/pilwon/ultimate-seed
#

# Pull base image.
FROM pilwon/ultimate-seed

# Add app directory.
ADD . /app

# Copy non-existing node_modules/ from the dependency image.
RUN rsync --ignore-existing --recursive /ultimate-seed/node_modules/ /app/node_modules/

# Install `ultimate-seed`.
RUN cd /app && bower install --allow-root
RUN cd /app && npm install --unsafe-perm
RUN cd /app && grunt build

# Expose ports.
EXPOSE 3000

# Define default command.
CMD ["node", "/app/server"]
