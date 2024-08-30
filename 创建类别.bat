@echo off
echo categories
set /p input= categories: 
hugo new categories/%input%/_index.md
pause
