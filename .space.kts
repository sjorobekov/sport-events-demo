job("Build and push Docker") {
  startOn {
    gitPush {
      // run on changes in all 'build-...'
      branchFilter {
        +"refs/heads/build-*"
      }
    }
  }
  docker {
    beforeBuildScript {
      content = """
          export BRANCH=${'$'}(echo ${'$'}JB_SPACE_GIT_BRANCH | cut -d'-' -f 2)
      """
    }
    build {
      file = "./Dockerfile"
    }

    push("fixturr.registry.jetbrains.space/p/software-development/registry/ui") {
      tags("V\$BRANCH")
    }
  }
}

job("Deploy to dev") {
  requirements {
    workerPool = WorkerPools.SELF_HOSTED
  }
  startOn {
    gitPush {
      branchFilter {
        +"refs/heads/release-*"
      }
    }
  }
  host("Run script") {
    shellScript {
      interpreter = "/bin/bash"
      content = """
        export BRANCH=${'$'}(echo ${'$'}JB_SPACE_GIT_BRANCH | cut -d'-' -f 2)
        && cd /home/runner/fixturr-compose/ui
        && export TAG=V\$BRANCH && echo \$TAG && docker-compose pull ui
        && docker-compose up -d --force-recreate ui
        && echo 'Container has been started'
      """
    }
  }
}