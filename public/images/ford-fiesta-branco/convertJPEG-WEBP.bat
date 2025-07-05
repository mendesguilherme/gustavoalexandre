@echo off
echo.
echo Convertendo imagens para .webp com qualidade 80...
echo.

REM Caminho para o cwebp.exe
set CWEBP="C:\webp\bin\cwebp.exe"

REM Converte .jpg, .jpeg e .png da pasta atual
for %%F in (*.jpg *.jpeg *.png) do (
    echo Convertendo: %%F
    %CWEBP% -q 80 "%%F" -o "%%~nF.webp"
)

echo.
echo Conversão concluída!
pause
