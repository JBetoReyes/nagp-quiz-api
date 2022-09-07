pipeline {
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
          - name: dind
            imagePullPolicy: Always
            image: docker:dind
            command: ["dockerd", "--host", "tcp://127.0.0.1:2375"]
            securityContext:
              privileged: true
            volumeMounts:
            - name: dockersock
              mountPath: /var/run/docker.sock
        volumes:
          - name: dockersock
            hostPath:
              path: /var/run/docker.sock
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
          sh 'docker ps'
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