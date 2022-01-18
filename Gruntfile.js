
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

module.exports = function(grunt) {
    grunt.initConfig({
        /* Project metadata is imported into the Grunt config from the project's `package.json` file */
        pkg: grunt.file.readJSON('package.json'), 
        
        /*  */
        env: {
            local : {
              src : ".env"
            }
        },

        /* Uses Dart Sass to convert your `index.scss` file into a unminified `main.sss` and minified `main.min.sss` */
        sass: {
            unminified: {
                options: {
                    sourcemap: 'none' // Doesn't generate the Sorucemap
                },
                files: {
                    'obsidian.css' : 'src/scss/index.scss'
                }
            }
        },

        /* Runs a task which copies and renames the final theme file from the project folder to the Vault's Theme folder. */
        copy: {
            local: { 
                expand: true, //
                src: 'obsidian.css', // Which file will be copied.
                dest: process.env.OBSIDIAN_PATH, // The destination folder; the path specified in the `.env` file pointing to your Vault's Theme folder.
                rename: function(dest, src) {
                   return dest + 'PrismDev.css';
                } // Renames the file to, in this case, `PrismDev.css` from `obsidian.css' when it's copied to the destination path.
            }
        },

        /* Runs tasks when changes are detected to the specified files. */
        watch: {
            build: {
                files: ['src/**/*.scss'], // Watched files
                tasks: ['env','sass','copy'] // Runs the following tasks in the specified order when there is a change detected to the Watched files.
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

    /* Creates a task called 'loadconst' which loads in the constant containing the path to your Vault's Theme folder. */
    grunt.registerTask('loadconst', 'Load constants', function() {
        grunt.config('OBSIDIAN_PATH', process.env.OBSIDIAN_PATH);
    });

    /* Creates a task called 'default' which grabs the variable from the .env file, runs the `loadconst' task to load it in and runs the 'watch' task to keep all other tasks running when there is a change detected to .scss/.css files in the project */
    grunt.registerTask('build',['env:local','loadconst','watch:build']);
}