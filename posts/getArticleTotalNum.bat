@echo off
chcp 936 >nul
setlocal enabledelayedexpansion

:: ����Ҫͳ�Ƶ��ļ���׺��Ĭ��ֵ��txt��
set "extension=mdx"

:: ֧�������в��������׺���磺count_files.bat pdf��
if not "%~1"=="" set "extension=%~1"

set count=0
for %%i in (*.%extension%) do (
    set /a count+=1
)
echo ��ǰĿ¼�� '.%extension%' �ļ�������!count!
pause