"""Filtro único da galeria: menos saturação, contraste suave, sombras puxadas para o
verde da paleta e luzes levemente quentes. Uso: grade.py origem destino [top bottom]"""
import sys, numpy as np
from PIL import Image, ImageOps
def grade(im):
    a=np.asarray(im).astype(np.float32)/255.0
    lum=(0.2126*a[...,0]+0.7152*a[...,1]+0.0722*a[...,2])[...,None]
    a=np.clip(lum+(a-lum)*0.72,0,1)
    a=np.clip(a+(a-0.5)*0.08-0.08*np.sin(np.pi*a)*(a-0.5),0,1)
    lum=(0.2126*a[...,0]+0.7152*a[...,1]+0.0722*a[...,2])[...,None]
    shadow=np.array([0.02,0.16,0.09]); high=np.array([1.0,0.93,0.80])
    ws=np.clip(1-lum*2,0,1)**1.3*0.32; wh=np.clip(lum*2-1,0,1)**1.3*0.16
    a=a*(1-ws)+shadow*ws; a=a*(1-wh)+high*wh; a=0.045+a*0.94
    return Image.fromarray((np.clip(a,0,1)*255).astype(np.uint8))
src,dst=sys.argv[1],sys.argv[2]
im=ImageOps.exif_transpose(Image.open(src)).convert('RGB')
if len(sys.argv)>4: im=im.crop((0,int(sys.argv[3]),im.width,int(sys.argv[4])))
im.thumbnail((1600,1600))
grade(im).save(dst,'JPEG',quality=82,optimize=True,progressive=True)
print(dst, im.size)
