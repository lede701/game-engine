## Tutorial Folders
To build each tutorial just rename the src folder in the main project folder and copy the tutorial src folder into the main project.  Clean out the build folder and then use grunt to build the tutorial directory.

### Example
C:\grunt>rename src src-mainline
C:\grunt>xcopy tutorials\tutorial03\src\*.* src\ /e


## Note
Make sure your not running grunt watch while renaming and coping files.