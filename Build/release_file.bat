@echo off
cd %~dp0

:: 获取当前目录名
set "cd_=%cd%"
:loop
set "cd_=%cd_:*\=%"
set "cd_tmp=%cd_:\=%"
if not "%cd_tmp%"=="%cd_%" goto loop
::echo "%cd_%"
::pause

:: 目标路径
set SRC_PATH=%~dp0
set DST_PATH=..\..\..\release_game


if "Build"=="%cd_%" goto path_error


::发布目录
XCOPY /E/S/Y "%SRC_PATH%*.*" "%DST_PATH%"

:end
::pause


:path_error
::pause