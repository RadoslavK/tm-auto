import { BuildingType } from '../_enums/buildingType';
import { accountContext } from '../accountContext';
import { ensureBuildingSpotPage } from './actions/ensurePage';

//  TODO add support of dorf3

/*
 public static void AnalyzeUnitCountsFromDorf3(string result)
 {
 var unitCounts = GameContext.UnitCounts;

 foreach (var village in GameContext.Villages)
 {
 var unitCountsNode = result.GetDocument().DocumentNode.SelectSingleNode($"//tbody/tr[.//a[contains(@href, '{village.Id}')]]");

 if (unitCountsNode == null)
 {
 continue;
 }

 var counts = unitCountsNode.SelectNodes("./td")
 .Take(10)
 .Select(unitCountNode => int.Parse(unitCountNode.InnerText))
 .ToArray();

 unitCounts.Add(village, counts);
 }
 }
 */

//  TODO finish and check with various unit movements.. raid,support, coming back, trapped etc

export const updateUnitsInformation = async (): Promise<void> => {
  const village = accountContext.villageService.currentVillage();

  const rallyPoint = village.buildings.spots.ofType(BuildingType.RallyPoint);

  if (!rallyPoint || !rallyPoint.isBuilt()) {
    return;
  }

  await ensureBuildingSpotPage(rallyPoint.fieldId);
};
