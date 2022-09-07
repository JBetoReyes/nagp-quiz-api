pipeline {
  agent {
    kubernetes {
      yamlFile 'k8s/pod.jenkins-agent.yaml'
    }
  }
  stages {
    stage('Run node') {
      steps {
        container('node') {
          sh 'node --version'
        }
        container('bitnami') {
            sh """
            kubectl config set-context prod
            kubectl get pods
            """
        }
      }
    }
    stage('Install') {
      steps {
        container('node') {
          sh 'npm install'
        }
      }
    }
    stage('Test') {
      steps {
        container('node') {
          sh 'npm run test'
          publishHTML(target: [
            reportDir: 'coverage/lcov-report',
            reportFiles: 'index.html',
            reportName: 'api coverage'
          ])
        }
      }
    }
    stage('Lint') {
      steps {
        container('node') {
          sh 'npm run lint:check'
        }
      }
    }
    stage('Prettier') {
      steps {
        container('node') {
          sh 'npm run format:check'
        }
      }
    }
    stage('Build') {
      steps {
        container('node') {
          sh 'npm run build'
        }
      }
    }
    stage('Docker Build') {
      steps {
        container('dind') {
          sh 'docker build -t jbetoreyes/quiz-api:latest .'
        }
      }
    }
    stage('Deployment') {
      steps {
        container('bitnami') {
          sh 'kubectl apply -f k8s/service.quiz-api.yaml'
          sh 'kubectl apply -f k8s/deployment.quiz-api.yaml'
        }
      }
    }
  }
}