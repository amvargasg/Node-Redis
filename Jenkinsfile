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
  }
  
}
