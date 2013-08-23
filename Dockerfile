#
# Dockerfile
#
# VERSION 0.1.0
# DOCKER-VERSION 0.5.3
#
# To build:
# 1. Install docker: http://docker.io
# 2. Download ultimate-seed: git clone https://github.com/pilwon/ultimate-seed.git
# 3. Build container: docker build -t pilwon/ultimate-seed .
# 4. Run the container: CID=$(docker run -d pilwon/ultimate-seed)
# 5. Check logs: docker logs $CID

FROM ubuntu:precise

# Install aptitude
RUN apt-get install -y aptitude
RUN aptitude update
RUN aptitude upgrade -y

# Install basic packages
RUN aptitude install -y python-software-properties python g++ make git

# Install Node.js and npm
RUN add-apt-repository -y ppa:chris-lea/node.js
RUN echo "deb http://us.archive.ubuntu.com/ubuntu/ precise universe" >> /etc/apt/sources.list
RUN aptitude update
RUN aptitude install -y nodejs

# Install dependencies
RUN npm install bower -g
RUN npm install grunt-cli -g

# Start app
ADD . /app
RUN cd /app; bower install --allow-root
RUN cd /app; npm install --unsafe-perm
RUN cd /app; grunt build
EXPOSE 3000
CMD ["node", "/app/server"]

