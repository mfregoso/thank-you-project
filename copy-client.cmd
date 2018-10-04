if not exist "TYP.Web\Client" mkdir TYP.Web\Client
del /f /s /q TYP.Web\Client\*.* > NUL
xcopy /q /e react\build\*.* TYP.Web\Client
dir TYP.Web\Client
