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
    }
    
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
    }
    
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
                  def created = openshift.newApp(templatePath,  "--as-deployment-config"  )
                  echo "new-app created ${created.count()} objects named: ${created.names()}"
                  created.describe()
                  echo "The build config which new-app just created"
                  def bc = created.narrow('bc')
                  echo "${bc.describe()}"
                  /*echo "build logs"
                  def result = bc.logs('-f')
                  echo "The logs operation require ${result.actions.size()} oc interactions"
                  echo "oc command executed"
                  echo "Logs executed: ${result.actions[0].cmd}"
                  */  
                }
            }
        }
      }
    }
    
    stage('build') {
        steps{
            script {
                //sh 'oc start-build node-redis'
                /* openshift.withCluster() {
                    openshift.withProject() {
                        
                        def buildSelector = bc.startBuild('node-redis')
                        //buildSelector.logs('-f')
                    }
                } */
            }
        }
        
    }
  
  }  
  
}
