@echo off
chcp 936 >nul
setlocal enabledelayedexpansion

:: 设置要统计的文件后缀（默认值：txt）
set "extension=mdx"

:: 支持命令行参数输入后缀（如：count_files.bat pdf）
if not "%~1"=="" set "extension=%~1"

set count=0
for %%i in (*.%extension%) do (
    set /a count+=1
)
echo 当前目录下 '.%extension%' 文件总数：!count!
pause