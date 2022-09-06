pipeline {
  agent {
    kubernetes {
      yaml '''
        apiVersion: v1
        kind: Pod
        metadata:
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
          - name: bitnami
            image: bitnami/kubectl
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
        container('bitnami') {
            withKubeConfig([credentialsId:"jenkins_kubernetes_token", serverUrl:"https://EEBB500747E532DD038C25E99E8C0BC1.sk1.us-west-1.eks.amazonaws.com", namespace: "jenkins"]) {
                sh 'kubectl get pods'
            }
        }
      }
    }
  }
}