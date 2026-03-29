# MicroSim Generation

## Generate the Fist Microsim

Run the /microsim-generator skill on the first #### Diagram in chapter 1.  Use the <details> element after that to get the specification

## TODO list generation

!!! prompt
❯ run the /microsim-utils python program that will put all the @docs/chapters #### Diagram details into JSON files in the @docs/sims/TODO dir           

## Generate 

## Session Log
first create a detailed session log on this task.  Note how many batch processes you generated and the additional tokens you used to use parallel     
processing.  Compare the token efficiency to doing all the microsims using a serial mode.  Estimate the wall-clock time as well as the total number of  
tokens used.  Note: - Total MicroSims: 80 implemented (+ 1 pre-existing graph-viewer = 81 in nav)                                                       
                                                                                                                                                        
  - Total JavaScript: 22,591 lines across 80 .js files                                                                                                  
  - Libraries used: 62 p5.js, 15 vis-network, 3 Chart.js                                                                                                
                                                                                                                                                        
  - Iframes: All already correctly placed in chapters                                                                                                   
                                                                                                                                                        
  - Navigation: mkdocs.yml updated with all 81 alphabetically sorted entries     