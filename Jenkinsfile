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
    
  }// end of stages
  
}// end of pipeline
