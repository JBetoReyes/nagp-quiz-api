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
            echo 'hello'
            echo '$(kubectl get pods)'
            shell 'echo "helloooo"'
            shell """
            kubectl config set-context prod
            kubectl get pods
            """
            // sh 'kubectl config set-context prod'
            // sh 'kubectl get pods'
        }
      }
    }
  }
}