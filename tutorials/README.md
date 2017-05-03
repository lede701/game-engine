## Tutorial Folders
To build each tutorial just rename the src folder in the main project folder and copy the tutorial src folder into the main project.  Clean out the build folder and then use grunt to build the tutorial directory.

### Example
<pre>
C:\grunt&gt;rename src src-mainline
C:\grunt&gt;xcopy tutorials\tutorial03\src\*.* src\ /e
</pre>


## Note
Make sure your not running grunt watch while renaming and coping files.  Grunt locks the files and folders and will causes erorrs when you try to make changes to the direcotry.