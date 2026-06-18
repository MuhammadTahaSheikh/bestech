import React, { useEffect, useState } from 'react';

function useResolvedTeamImage(cmsImage, fallbackImage) {
  const [src, setSrc] = useState(() => fallbackImage || cmsImage || '');

  useEffect(() => {
    if (!cmsImage) {
      setSrc(fallbackImage || '');
      return;
    }

    setSrc(fallbackImage || cmsImage);

    const probe = new Image();
    probe.onload = () => setSrc(cmsImage);
    probe.onerror = () => setSrc(fallbackImage || '');
    probe.src = cmsImage;

    return () => {
      probe.onload = null;
      probe.onerror = null;
    };
  }, [cmsImage, fallbackImage]);

  return src || null;
}

/**
 * Shows bundled static photo immediately, then swaps to CMS upload only if it loads.
 * Prevents flash-then-disappear when media.php returns 404 for missing uploads.
 */
export default function TeamMemberPhoto({
  cmsImage,
  fallbackImage,
  alt,
  imageComponent: ImageComponent,
  avatar,
  showAvatarWhenEmpty = true,
  ...imgProps
}) {
  const src = useResolvedTeamImage(cmsImage, fallbackImage);

  if (!src) {
    return showAvatarWhenEmpty ? avatar : null;
  }

  return (
    <ImageComponent
      src={src}
      alt={alt}
      {...imgProps}
    />
  );
}

export function mergeTeamWithStaticImages(cmsMembers, staticMembers) {
  const norm = (name) => String(name).toLowerCase().replace(/\s+/g, ' ').trim();

  const findStatic = (cmsName) => {
    const cmsNorm = norm(cmsName);
    const exact = staticMembers.find((s) => norm(s.name) === cmsNorm);
    if (exact) return exact;
    const cmsFirst = cmsNorm.split(' ')[0];
    return staticMembers.find((s) => {
      const sNorm = norm(s.name);
      return sNorm === cmsFirst || cmsNorm.startsWith(`${sNorm} `) || sNorm.startsWith(cmsFirst);
    });
  };

  return cmsMembers.map((cms) => {
    const stat = findStatic(cms.name);
    const hasStatic = Boolean(stat?.image);
    return {
      ...cms,
      // Use bundled photo when available — avoids 404s from missing CMS files after deploy
      cmsImage: hasStatic ? undefined : cms.image,
      image: stat?.image || cms.image,
      imageFallback: stat?.image,
    };
  });
}
