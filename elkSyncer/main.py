#!/usr/bin/python

import os
import subprocess
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv('MONGO_URL')
ELASTICSEARCH_URL = os.getenv('ELASTICSEARCH_URL')

command = 'mongo-connector -m %s  -c mongo-connector-config.json --target-url %s' % (MONGO_URL, ELASTICSEARCH_URL)

print('Starting connector ....', command)

subprocess.Popen(command, shell=True)

print('End connector')