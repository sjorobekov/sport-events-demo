job("Build and push Docker") {
  docker {
    beforeBuildScript {
      content = """
        export BRANCH=${'$'}(echo ${'$'}JB_SPACE_GIT_BRANCH | cut -d'/' -f 3)
        export HASH=${'$'}(git rev-parse --short HEAD)
      """
    }
    build {
      file = "./Dockerfile"
    }

    push("fixturr.registry.jetbrains.space/p/software-development/registry/ui") {
      tags("\$BRANCH-\$HASH")
    }
  }
}

job("Deploy to dev") {
  requirements {
    workerPool = WorkerPools.SELF_HOSTED
    workerTags("dev")
  }
  host("Run script") {
    shellScript {
      interpreter = "/bin/bash"
      content = """
        export TAG=${'$'}(echo ${'$'}JB_SPACE_GIT_BRANCH | cut -d'/' -f 3)-${'$'}(git rev-parse --short HEAD)
        cd /home/runner/fixturr-compose/ui
        echo ${'$'}TAG && docker compose pull ui
        docker compose up -d --force-recreate ui
        echo 'Container has been started'
        echo 'Start pruning unused containers, images, networks, build cache'
        docker system prune -f
        echo 'Prune completed'
      """
    }
  }
}


job("Deploy to prod") {
  requirements {
    workerPool = WorkerPools.SELF_HOSTED
    workerTags("prod")
  }
  host("Deploying Docker Image") {
    shellScript {
      interpreter = "/bin/bash"
      content = """
        export TAG=${'$'}(echo ${'$'}JB_SPACE_GIT_BRANCH | cut -d'/' -f 3)-${'$'}(git rev-parse --short HEAD)
        cd /home/fixturr/app/ui
        echo ${'$'}TAG && docker compose pull ui
        docker compose up -d --force-recreate ui
        echo 'Container has been started'
        echo 'Start pruning unused containers, images, networks, build cache'
        docker system prune -f
        echo 'Prune completed'
      """
    }
  }
}

job("Get Dev docker logs") {
  requirements {
    workerPool = WorkerPools.SELF_HOSTED
    workerTags("dev")
  }

  host("Get docker compose logs") {
    shellScript {
      interpreter = "/bin/bash"
      content = """
        cd /home/runner/fixturr-compose/ui
        docker compose logs
      """
    }
  }
}
