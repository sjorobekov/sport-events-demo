job("Build and push Docker") {
  startOn {
    gitPush {
      // run on changes in all 'release-...'
      branchFilter {
        +"refs/heads/release-*"
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