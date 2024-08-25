FROM python:3.12-slim

# Set the working directory in docker
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN apt-get update \
    && apt-get install -y build-essential libpq-dev \
    && apt-get clean
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy project
COPY . /app/

# Expose the port the app runs on
EXPOSE 8000

# Run the project
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]