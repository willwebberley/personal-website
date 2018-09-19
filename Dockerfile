FROM mhart/alpine-node

# Set the default working directory
WORKDIR /usr/src

# Install dependencies
COPY package.json package-lock.json /usr/src/
RUN npm install

# Copy the relevant files to the working directory
COPY . .

# Build and export the app
RUN npm run build
RUN mkdir /public
RUN mv ./public/* /public
