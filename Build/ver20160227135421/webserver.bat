@echo off
start http://127.0.0.1:8001
python -m http.server 8001
pause