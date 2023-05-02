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
    workerTags("dev")
  }
  host("Run script") {
    shellScript {
      interpreter = "/bin/bash"
      content = """
        export TAG=${'$'}(echo ${'$'}JB_SPACE_GIT_BRANCH | cut -d'/' -f 3)
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
        export TAG=${'$'}(echo ${'$'}JB_SPACE_GIT_BRANCH | cut -d'/' -f 3)
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

job("Remove docker image") {
  container(displayName = "Remove docker image from registry", image = "gradle") {
    kotlinScript { api ->
      val packages = api.space().projects.packages.repositories.packages.versions.getAllPackageVersions(
        project = ProjectIdentifier.Id("1ZmVug10EbUO"),
        repository = PackageRepositoryIdentifier.Id("3HYY8J34LUxD"),
        packageName = "ui",
        query = "",
        sortColumn = PackagesSortColumn.LastAccessed,
        sortOrder = ColumnSortOrder.ASC
      ).data

      for (item in packages) {
        val branch = api.gitBranch().split('/')[2]
        val found = item.tags?.find { tag -> branch.equals(tag) }
        if (found != null) {
		      api.space().projects.packages.repositories.packages.versions.deletePackageVersion(
            project = ProjectIdentifier.Id("1ZmVug10EbUO"),
            repository = PackageRepositoryIdentifier.Id("3HYY8J34LUxD"),
            packageName = "ui",
            packageVersion = item.version
          )
          break
        }
      }
    }
  }
}
