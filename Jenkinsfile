pipeline {
  environment {
    dockerImage = ''
    GIT_COMMIT_HASH = sh (script: "git log -n 1 --pretty=format:'%H'", returnStdout: true)
  }
  agent {
    kubernetes {
      yamlFile 'k8s/pod.jenkins-agent.yaml'
    }
  }
  stages {
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
          script {
            dockerImage = docker.build("jbetoreyes/quiz-api:latest")
          }
        }
      }
    }
    stage('Docker Push') {
      when {
        expression {
          return (env.BRANCH_NAME=="master")
        }
      }
      steps {
        container('dind') {
          script {
            docker.withRegistry('', 'docker-hub-integration') {
              dockerImage.push()
              dockerImage.push("${GIT_COMMIT_HASH}")
            }
          }
        }
      }
    }
    stage('Deployment') {
      when {
        expression {
          return (env.BRANCH_NAME=="master")
        }
      }
      steps {
        container('bitnami') {
          sh 'kubectl apply -f k8s/service.quiz-api.yaml'
          sh 'kubectl apply -f k8s/deployment.quiz-api.yaml'
          sh 'kubectl rollout restart deploy quiz-api -n quiz-app'
        }
      }
    }
  }
}