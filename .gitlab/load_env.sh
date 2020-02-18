#!/bin/sh

# ============
# <qemu-support>
if [ $QEMU_ARCH == 'amd64' ]; then
  touch qemu-amd64-static
else
  curl -L "https://github.com/multiarch/qemu-user-static/releases/download/${QEMU_VERSION}/qemu-${QEMU_ARCH}-static.tar.gz" | tar xz
  docker run --rm --privileged multiarch/qemu-user-static:register --reset
fi
# </qemu-support>

# set Image Id
if [ $CI_COMMIT_REF_NAME == 'master' ]; then
  export IMAGE_ID="$CI_REGISTRY_IMAGE:${VERSION}-${TAG}"
else
  export IMAGE_ID="$CI_REGISTRY_IMAGE:${VERSION}-${CI_COMMIT_REF_NAME//[\/]/-}-${TAG}"
fi
# ============