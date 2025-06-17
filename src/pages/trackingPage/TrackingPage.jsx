import { Map, ObjectManager, YMaps } from "@pbe/react-yandex-maps";
import clsx from "clsx";

const objectManagerFeatures = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: 1,
      geometry: {
        type: "Point",
        coordinates: [42.9, 74.7],
      },
      properties: {
        balloonContent: "<strong>Центр Бишкека</strong>",
        hintContent: "Точка 1",
      },
    },
    {
      type: "Feature",
      id: 2,
      geometry: {
        type: "Point",
        coordinates: [42.87, 74.6],
      },
      properties: {
        balloonContent: "Вторая точка",
        hintContent: "Точка 2",
      },
    },
  ],
};

export const TrackingPage = () => {
  return (
    <YMaps>
      <Map
        defaultState={{ center: [42.8746, 74.6122], zoom: 12 }}
        className={clsx("w-full h-full")}
      >
        <ObjectManager
          options={{
            clusterize: true,
            gridSize: 32,
          }}
          objects={{
            openBalloonOnClick: true,
            preset: "islands#greenDotIcon",
          }}
          clusters={{
            preset: "islands#redClusterIcons",
          }}
          filter={(object) => object.id % 2 === 0}
          defaultFeatures={objectManagerFeatures}
          modules={[
            "objectManager.addon.objectsBalloon",
            "objectManager.addon.objectsHint",
          ]}
        />
      </Map>
    </YMaps>
  );
};
