import React, { useRef, useEffect } from 'react'
import { zoom, select } from 'd3'
import {
  Scene,
  Object3D,
  PerspectiveCamera,
  WebGLRenderer,
  CanvasTexture,
  Sprite,
  SpriteMaterial
} from 'three'
import { removeChildrenNodes } from '../../../utils/irisUtils'

export default ({ data, xScale, yScale, zScale, colorScale, xColumn, yColumn, zColumn }) => {
  const myContainer = useRef(null)

  useEffect(() => {
    if (myContainer.current) {
      var divElement = document.getElementById('iris-3d-div')
      removeChildrenNodes(divElement)

      const width = window.innerWidth * 0.75
      const height = window.innerHeight * 0.60
      const circleSize = 0.10
      const circleOpacity = 0.9
      const circleStrokeWidth = 0.7
      const cameraDistance = 2.5
      const rotationSensitivity = 0.009
      const rotationIncrement = -0.2

      const generateSprite = color => {
        const canvas = document.createElement('canvas')
        const side = 64
        const radius = side / 2 - 4
        canvas.width = side
        canvas.height = side

        const context = canvas.getContext('2d')
        context.beginPath()
        context.arc(side / 2, side / 2, radius, 0, 2 * Math.PI, false)
        context.globalAlpha = circleOpacity
        context.fillStyle = color
        context.fill()
        context.lineWidth = circleStrokeWidth
        context.strokeStyle = 'black'
        context.stroke()

        return canvas
      }

      const materials = {}
      const material = color => {
        if (!materials[color]) {
          materials[color] = new SpriteMaterial({
            map: new CanvasTexture(generateSprite(color))
          })
        }
        return materials[color]
      }

      const scene = new Scene()
      const camera = new PerspectiveCamera(75, width / height, 0.1, 1000)
      const renderer = new WebGLRenderer({ alpha: true })
      renderer.setSize(width, height)
      myContainer.current.appendChild(renderer.domElement)

      const root = new Object3D()
      scene.add(root)
      camera.position.z = cameraDistance

      const rotationInteraction = zoom()
      rotationInteraction.scaleExtent([1, 1])
      rotationInteraction.translateExtent([
        [-Infinity, -Math.PI / 2 / rotationSensitivity],
        [Infinity, height + Math.PI / 2 / rotationSensitivity]
      ])

      rotationInteraction.on('zoom', (event) => {
        root.rotation.y = event.transform.x * rotationSensitivity
        root.rotation.x = event.transform.y * rotationSensitivity
      })

      const rotationSelection = select(renderer.domElement).call(rotationInteraction)
      rotationInteraction.translateBy(rotationSelection, 0, 0)

      const animate = () => {
        requestAnimationFrame(animate)
        rotationInteraction.translateBy(rotationSelection, rotationIncrement, 0)
        renderer.render(scene, camera)
      }
      animate()

      const addSprite = ({ x, y, z, color }) => {
        const sprite = new Sprite(material(color))
        sprite.position.x = x
        sprite.position.y = y
        sprite.position.z = z
        sprite.scale.set(circleSize, circleSize, 1)
        root.add(sprite)
      }

      data.map(d => ({
        x: xScale(d[xColumn]),
        y: yScale(d[yColumn]),
        z: zScale(d[zColumn]),
        color: colorScale(d['Species'])
      })).forEach(addSprite)
    }
  }, [data, xScale, yScale, zScale, colorScale, xColumn, yColumn, zColumn])

  return (
    <div ref={myContainer} id='iris-3d-div' className='iris-3d-div'>
    </div>
  )
}
