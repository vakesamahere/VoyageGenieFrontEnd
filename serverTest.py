
import json
import time
import logging
from flask import Flask, request
from flask import Response
from flask import render_template
from flask_cors import CORS
import threading

app = Flask(__name__)
CORS(app, supports_credentials=True)

def get_message():
    """this could be any function that blocks until data is ready"""
    time.sleep(1)
    s = time.ctime(time.time())
    return json.dumps(['当前时间：' + s , 'a'], ensure_ascii=False)


@app.route('/')
def hello_world():
    return render_template('index.html')


@app.route('/stream',methods=['POST'])
def stream():
    data = request.get_json()
    logging.debug(data)

    def eventStream():
        id = 0
        while id<3:
            time.sleep(1)
            yield 'id: {}\nevent: add\ndata: 本信息用作测试 {}\n\n'.format(id,get_message())
            id += 1


    return Response(eventStream(), mimetype="text/event-stream")

class Receiver:
    def __init__(self) -> None:
        self.tokens=[]
        

    def deq(self):
        if not self.tokens:
            time.sleep(0.1)
            return False
        item = self.tokens[0]
        self.tokens.pop(0)
        return item
    def enq(self,item):
        self.tokens.append(item)


if __name__ == '__main__':
    app.run()

