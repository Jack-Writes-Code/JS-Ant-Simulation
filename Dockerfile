# By jackmwhit

FROM ubuntu:18.04

COPY requirements.txt .

#SET UP PYTHON
RUN apt-get update
RUN apt-get install -y python python-pip python3-pip python3-dev build-essential libssl-dev libffi-dev python3-setuptools python3-venv
RUN pip install -r requirements.txt

COPY . /app
WORKDIR /app

EXPOSE 8080/tcp

#CMD ["python", "main.py"]
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "wsgi:app"]