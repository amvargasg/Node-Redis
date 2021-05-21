def templateName = 'node-redis'
def templatePath = 'https://github.com/mariaelisacf/Node-Redis' 

pipeline {
  
  agent {
    node {
      label 'nodejs' 
    }
  }
  
  stages {
    stage('preamble') {
        steps {
            script {
                openshift.withCluster() {
                    openshift.withProject() {
                        echo "Using project: ${openshift.project()}"
                    }
                }
            }
        }
    }// end of stage 'preamble'
    
    stage('cleanup') {
      steps {
        script {
            openshift.withCluster() {
                openshift.withProject() {
                  openshift.selector("all", [ template : templateName ]).delete() 
                  if (openshift.selector("secrets", templateName).exists()) { 
                    openshift.selector("secrets", templateName).delete()
                  }
                  echo "Cleanup done"
                }
            }
        }
      }
    } // end of stage 'cleanup'
    
    stage('create') {
        
       when {
           expression {
               openshift.withCluster() {
                   return !openshift.selector('bc', templateName).exists()
                }
            }    
       }
        
      steps {
        script {
            openshift.withCluster() {
                openshift.withProject() {
                  sh 'oc new-app --name node-redis nodejs:latest~https://github.com/mariaelisacf/Node-Redis --strategy=docker'
                  /*def created = openshift.newApp(templatePath,  "--as-deployment-config"  )
                  echo "new-app created ${created.count()} objects named: ${created.names()}"
                  created.describe()
                  echo "The build config which new-app just created"
                  def bc = created.narrow('bc')
                  echo "${bc.describe()}"
                  echo "build logs"
                  def result = bc.logs('-f')
                  echo "The logs operation require ${result.actions.size()} oc interactions"
                  echo "oc command executed"
                  echo "Logs executed: ${result.actions[0].cmd}"
                  */  
                }
            }
        }
      }
    }// end of stage 'create'
    
    stage('build') {
        steps {
          script{
          openshift.withCluster() {
            openshift.withProject() {
              def bc = openshift.selector("bc",templateName).related('builds')
              /* timeout(10){
                bc.untilEach(1){
                  return (it.object().status.phase == "Complete")
                }
              }*/
            }
          }
        }
      }   
    }// end of stage 'build'
    
    stage('deploy') {
        steps {
          script {
              openshift.withCluster() {
                  openshift.withProject() {
                    def rm = openshift.selector("dc", templateName).rollout().latest()
                    /*timeout(5) { 
                      openshift.selector("dc", templateName).related('pods').untilEach(1) {
                        return (it.object().status.phase == "Running")
                      }
                    }*/
                  }
              }
          }
        }
    }// end of stage 'deploy'
    
  }// end of stages
  
}// end of pipeline
