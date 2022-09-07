pipeline {
  environment {
    JENKINS_JAVA_OPTIONS = 'org.jenkinsci.plugins.durabletask.BourneShellScript.LAUNCH_DIAGNOSTICS=true'
  }
  agent {
    kubernetes {
      yaml '''
        apiVersion: v1
        kind: Pod
        metadata:
          namespace: jenkins
          labels:
            some-label: some-label-value
        spec:
          serviceAccountName: jenkins-agent
          containers:
          - name: node
            image: node:18-alpine
            command:
            - cat
            tty: true
          - name: bitnami
            image: bitnami/kubectl
            imagePullPolicy: Always
            command:
            - cat
            tty: true
          securityContext:                                                                                                         
            runAsUser: 1000
        '''
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
    stage('Lint') {
      steps {
        container('node') {
          sh 'npm run lint'
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
  }
}