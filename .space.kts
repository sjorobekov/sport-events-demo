job("Build and push Docker") {
  docker {
    beforeBuildScript {
      content = """
        export BRANCH=${'$'}(echo ${'$'}JB_SPACE_GIT_BRANCH | cut -d'/' -f 3)
      """
    }
    build {
      file = "./Dockerfile"
    }

    push("fixturr.registry.jetbrains.space/p/software-development/registry/ui") {
      tags("\$BRANCH")
    }
  }
}

job("Deploy to dev") {
  requirements {
    workerPool = WorkerPools.SELF_HOSTED
  }
  host("Run script") {
    shellScript {
      interpreter = "/bin/bash"
      content = """
        export BRANCH=${'$'}(echo ${'$'}JB_SPACE_GIT_BRANCH | cut -d'/' -f 3)
        cd /home/runner/fixturr-compose/ui
        echo ${'$'}TAG && docker compose pull ui
        docker compose up -d --force-recreate ui
        echo 'Container has been started'
      """
    }
  }
}