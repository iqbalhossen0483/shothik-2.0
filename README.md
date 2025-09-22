## Docker - Development (Watch Mode)
#
To run the Docker container in watch mode for development:

1. Build the Docker image:
   ```bash
   docker build -t shothik-frontend .
   ```
   Make sure you are in the root directory of the project when running this command. The "." at the end of the command is important. Make sure the image is built successfully before running the container.
2. Run the Docker container with volume mounting:

   docker run -p 3000:3000 -v $(pwd):/app shothik-frontend

   This will mount your current directory into the container, allowing changes to your code to be reflected in the running application.

