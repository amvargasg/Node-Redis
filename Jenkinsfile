pipeline {
  agent {
    node {
      label 'nodejs'
    }

  }
  stages {
    stage('prepare') {
      steps {
        sh 'npm install'
        sh 'npm --version'
      }
    }

    stage('test') {
      steps {
        sh 'echo test'
      }
    }

    stage('build') {
      steps {
        sh 'npm start'
      }
    }

  }
}
