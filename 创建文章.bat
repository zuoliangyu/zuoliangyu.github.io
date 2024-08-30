@echo off
echo new_pass
set /p input= Slug: 
hugo new post/%Date:~0,4%/%Date:~5,2%%Date:~8,2%-%input%/index.md
pause
