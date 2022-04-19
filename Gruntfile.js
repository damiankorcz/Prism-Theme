
/* 
Prism Theme Compiler for Obsidian

Grunt is JS library that runs a sequence of compilation tasks, and watches 
the working files to automatically run this sequence whenever changes happen. 
Read more at gruntjs.com

Based on the Minimal Theme Compiler for Obsidian by Stephan Ango (@kepano)
Minimal Theme: https://github.com/kepano/obsidian-minimal
MIT License
Copyright (c) 2020-2021 Stephan Ango (@kepano)

See readme for more details:
https://github.com/damiankorcz/obsidian-prism#-Build-Instructions
*/
   
/* Setup for my Windows Desktop */
if (process.platform === "win32") {
    module.exports = function(grunt) {
        grunt.initConfig({
            /* Project metadata is imported into the Grunt config from the project's `package.json` file */
            pkg: grunt.file.readJSON('package.json'),

            /* Imports paths to the Theme and Snippet folder in my vault */
            env: {
                main : {
                src : "windows.env"
                }
            },

            /* Uses Dart Sass to process the main theme or the snippet  */
            sass: {
                main: {
                    options: {
                        sourcemap: 'none' // Doesn't generate the Sorucemap
                    },
                    files: {
                        'obsidian.css' : 'src/scss/index.scss'
                    }
                },
                snippetMHS: {
                    options: {
                        sourcemap: 'none' // Doesn't generate the Sorucemap
                    },
                    files: {
                        'src/snippets/Prism Mark Highlight System.css' : 'src/snippets/Prism Mark Highlight System/indexMHS.scss'
                    }
                }
            },
            
            /* Clears up the file from any empty lines */
            removeemptylines: {
                main: {
                    options: {
                        regex: /(?:[ |\t]*\/\*\s?remove-empty-lines-start\s?\*\/)\n?([\s\S]+?)(?:[ |\t]*\/\*\s?remove-empty-lines-end\s?\*\/)/g
                    },
                    files: {
                    'obsidian.css': ['obsidian.css']
                    }
                }
            },
    
            /* Runs a task which copies and renames the final theme file from the project folder to the Vault's Theme folder. */
            copy: {
                main: { 
                    expand: true, //
                    src: 'obsidian.css', // Which file will be copied.
                    dest: process.env.OBSIDIAN_THEME_PATH, // The destination folder; the path specified in the `.env` file pointing to your Vault's Theme folder.
                    rename: function(dest, src) {
                        console.log(dest + 'PrismDev.css');
                        return dest + 'PrismDev.css';
                    } // Renames the file to, in this case, `PrismDev.css` from `obsidian.css' when it's copied to the destination path.
                },
                snippetMHS: { 
                    expand: true, //
                    src: 'src/snippets/Prism Mark Highlight System.css', // Which file will be copied.
                    dest: process.env.OBSIDIAN_SNIPPET_PATH, // The destination folder; the path specified in the `.env` file pointing to your Vault's Snippet folder.
                    rename: function(dest, src) {
                        return dest + 'Prism Mark Highlight System Dev.css';
                    } // Renames the file to, in this case, `PrismDev.css` from `obsidian.css' when it's copied to the destination path.
                }
            },
    
            /* Runs tasks when changes are detected to the specified files. */
            watch: {
                main: {
                    files: ['src/scss/**/*.scss'], // Watched files
                    tasks: ['env:main','sass:main','removeemptylines:main','copy:main'] // Runs the following tasks in the specified order when there is a change detected to the Watched files.
                },
                snippetMHS: {
                    files: ['src/snippets/Prism Mark Highlight System/*.scss'], // Watched files
                    tasks: ['env:main','sass:snippetMHS','copy:snippetMHS'] // Runs the following tasks in the specified order when there is a change detected to the Watched files.
                }   
            }
        });
        
        /* Load the plugin that provides the "env" task. */
        grunt.loadNpmTasks('grunt-env');
    
        /* Load the plugin that provides the "sass" task. */
        grunt.loadNpmTasks('grunt-sass-scss');
    
        /* Load the plugin that provides the "copy" task. */
        grunt.loadNpmTasks('grunt-contrib-copy');
    
        /* Load the plugin that provides the "watch" task. */
        grunt.loadNpmTasks('grunt-contrib-watch');
    
        /* Load the plugin that provides the "remove-empty-lines" task. */
        grunt.loadNpmTasks('grunt-remove-empty-lines');
        
        /* Creates a task called 'loadconstmain' which loads in the constant containing the path to your Vault's Theme folder. */
        grunt.registerTask('loadconstmain', 'Load constants', function() {
            grunt.config('OBSIDIAN_THEME_PATH', process.env.OBSIDIAN_THEME_PATH);
        });
        
        /* Creates a task called 'loadconstsnippet' which loads in the constant containing the path to your Vault's S folder. */
        grunt.registerTask('loadconstsnippet', 'Load constants', function() {
            grunt.config('OBSIDIAN_SNIPPET_PATH', process.env.OBSIDIAN_SNIPPET_PATH);
        });
    
        /* Creates a task called 'default' which grabs the variable from the .env file, runs the `loadconst' task to load it in and runs the 'watch' task to keep all other tasks running when there is a change detected to .scss/.css files in the project */
        grunt.registerTask('main',['env:main','loadconstmain','watch:main']);
    
        grunt.registerTask('snippetMHS',['env:main','loadconstsnippet','watch:snippetMHS']);
    }
}

/* Setup for my Linux Laptop */
if (process.platform === "linux") {
    module.exports = function(grunt) {
        grunt.initConfig({
            /* Project metadata is imported into the Grunt config from the project's `package.json` file */
            pkg: grunt.file.readJSON('package.json'),

            /* Imports paths to the Theme and Snippet folder in my vault */
            env: {
                main : {
                src : "linux.env"
                }
            },

            /* Uses Dart Sass to process the main theme or the snippet  */
            sass: {
                main: {
                    options: {
                        sourcemap: 'none' // Doesn't generate the Sorucemap
                    },
                    files: {
                        'obsidian.css' : 'src/scss/index.scss'
                    }
                },
                snippetMHS: {
                    options: {
                        sourcemap: 'none' // Doesn't generate the Sorucemap
                    },
                    files: {
                        'src/snippets/Prism Mark Highlight System.css' : 'src/snippets/Prism Mark Highlight System/indexMHS.scss'
                    }
                }
            },
            
            /* Clears up the file from any empty lines */
            removeemptylines: {
                main: {
                    options: {
                        regex: /(?:[ |\t]*\/\*\s?remove-empty-lines-start\s?\*\/)\n?([\s\S]+?)(?:[ |\t]*\/\*\s?remove-empty-lines-end\s?\*\/)/g
                    },
                    files: {
                    'obsidian.css': ['obsidian.css']
                    }
                }
            },
    
            /* Runs a task which copies and renames the final theme file from the project folder to the Vault's Theme folder. */
            copy: {
                main: { 
                    expand: true, //
                    src: 'obsidian.css', // Which file will be copied.
                    dest: process.env.OBSIDIAN_THEME_PATH, // The destination folder; the path specified in the `.env` file pointing to your Vault's Theme folder.
                    rename: function(dest, src) {
                        console.log(dest + 'PrismDev.css');
                        return dest + 'PrismDev.css';
                    } // Renames the file to, in this case, `PrismDev.css` from `obsidian.css' when it's copied to the destination path.
                },
                snippetMHS: { 
                    expand: true, //
                    src: 'src/snippets/Prism Mark Highlight System.css', // Which file will be copied.
                    dest: process.env.OBSIDIAN_SNIPPET_PATH, // The destination folder; the path specified in the `.env` file pointing to your Vault's Snippet folder.
                    rename: function(dest, src) {
                        return dest + 'Prism Mark Highlight System Dev.css';
                    } // Renames the file to, in this case, `PrismDev.css` from `obsidian.css' when it's copied to the destination path.
                }
            },
    
            /* Runs tasks when changes are detected to the specified files. */
            watch: {
                main: {
                    files: ['src/scss/**/*.scss'], // Watched files
                    tasks: ['env:main','sass:main','removeemptylines:main','copy:main'] // Runs the following tasks in the specified order when there is a change detected to the Watched files.
                },
                snippetMHS: {
                    files: ['src/snippets/Prism Mark Highlight System/*.scss'], // Watched files
                    tasks: ['env:main','sass:snippetMHS','copy:snippetMHS'] // Runs the following tasks in the specified order when there is a change detected to the Watched files.
                }   
            }
        });
    
        /* Load the plugin that provides the "env" task. */
        grunt.loadNpmTasks('grunt-env');
    
        /* Load the plugin that provides the "sass" task. */
        grunt.loadNpmTasks('grunt-sass-scss');
    
        /* Load the plugin that provides the "copy" task. */
        grunt.loadNpmTasks('grunt-contrib-copy');
    
        /* Load the plugin that provides the "watch" task. */
        grunt.loadNpmTasks('grunt-contrib-watch');
    
        /* Load the plugin that provides the "remove-empty-lines" task. */
        grunt.loadNpmTasks('grunt-remove-empty-lines');
    
        /* Creates a task called 'loadconstmain' which loads in the constant containing the path to your Vault's Theme folder. */
        grunt.registerTask('loadconstmain', 'Load constants', function() {
            grunt.config('OBSIDIAN_THEME_PATH', process.env.OBSIDIAN_THEME_PATH);
        });
    
        /* Creates a task called 'loadconstsnippet' which loads in the constant containing the path to your Vault's S folder. */
        grunt.registerTask('loadconstsnippet', 'Load constants', function() {
            grunt.config('OBSIDIAN_SNIPPET_PATH', process.env.OBSIDIAN_SNIPPET_PATH);
        });
    
        /* Creates a task called 'default' which grabs the variable from the .env file, runs the `loadconst' task to load it in and runs the 'watch' task to keep all other tasks running when there is a change detected to .scss/.css files in the project */
        grunt.registerTask('main',['env:main','loadconstmain','watch:main']);
    
        grunt.registerTask('snippetMHS',['env:main','loadconstsnippet','watch:snippetMHS']);
    }
}