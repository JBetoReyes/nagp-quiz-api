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
          - name: maven
            image: maven:alpine
            command:
            - cat
            tty: true
          - name: k8s
            image: alpine/k8s
            command:
            - cat
            tty: true
        '''
    }
  }
  stages {
    stage('Run maven') {
      steps {
        container('maven') {
          sh 'mvn -version'
        }
        container('k8s') {
            sh 'echo "testing"'
            // sh 'kubectl config set-context prod'
            // sh 'kubectl get pods'
        }
      }
    }
  }
}