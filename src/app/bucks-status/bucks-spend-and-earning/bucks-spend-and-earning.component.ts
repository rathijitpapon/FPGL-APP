import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SourceSinkService} from '../../services/source-sink.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Chart} from 'chart.js';
import {LoaderService} from '../../loader/loader.service';

@Component({
  selector: 'app-bucks-spend-and-earning',
  templateUrl: './bucks-spend-and-earning.component.html',
  styleUrls: ['./bucks-spend-and-earning.component.css']
})
export class BucksSpendAndEarningComponent implements OnInit {

  @Input() selectedDatabase: any;
  @Input() lowerLimitOfBucks: any;
  @Input() upperLimitOfBucks: any;

  legendDataforEarn = [];
  legendDataforSpend = [];
  private flagArray: any[] = [];
  width: any;
  height: any;
  fontWeight: any;
  legendPosition: any;

  constructor(private sourceSinkService: SourceSinkService, public loaderService: LoaderService) {
    Chart.plugins.unregister(ChartDataLabels);
  }

  options: any;
  legend: any = true;
  chartType: any;
  datasets: any;
  labels: any;
  isShown: any = false;
  maxPositiveValue = 0;
  maxNegativeValue = 0;
  barChartPlugins = [ChartDataLabels];

  // barChartPlugins = [];



  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.width = window.innerWidth + ((window.innerWidth < 800) ? 600 : 0);
    this.height = (window.innerWidth < 800) ? 700 : 700;
    this.fontWeight = (window.innerWidth < 800) ? 'normal' : 'bold';
    this.legendPosition = (window.innerWidth < 800) ? 'top' : 'right';
    this.datasets = [];
    this.labels = [];
    this.options = {};
    this.isShown = false;
    this.sourceSinkService.getBucksSpendAndEarning(this.selectedDatabase, this.upperLimitOfBucks, this.lowerLimitOfBucks)
      .subscribe((param: any) => {
        this.isShown = true;
        this.labels = param.userLevels;
        this.datasets = [
          {
            data: param.averageEarnAfterFight,
            label: 'averageEarnAfterFight'
          },
          {
            data: param.averageEarninGoal,
            label: 'averageEarninGoal'
          },
          {
            data: param.averageEarnInAppPackChest,
            label: 'averageEarnInAppPackChest'
          },
          {
            data: param.averageEarnInAppUSD,
            label: 'averageEarnInAppUSD'
          },
          {
            data: param.averageEarnDailyBonus,
            label: 'averageEarnDailyBonus'
          },
          {
            data: param.averageEarnInAppPanel,
            label: 'averageEarnInAppPanel'
          },
          {
            data: param.averageEarninitialbuck,
            label: 'averageEarninitialbuck'
          },
          {
            data: param.averageEarnInAppSpecialOffer,
            label: 'averageEarnInAppSpecialOffer'
          },
          {
            data: param.averageEarndailyBonusProduct,
            label: 'averageEarndailyBonusProduct'
          },
          {
            data: param.averageEarnAdReward,
            label: 'averageEarnAdReward'
          },
          {
            data: param.averageEarnInApp,
            label: 'averageEarnInApp'
          },
          {
            data: param.averageEarnOwnAdReward,
            label: 'averageEarnOwnAdReward'
          },
          {
            data: param.averageEarnVideoAdReward,
            label: 'averageEarnVideoAdReward'
          },
          {
            data: param.averageEarnVIPBenefits,
            label: 'averageEarnVIPBenefits'
          },
          {
            data: param.averageEarnJump3Times,
            label: 'averageEarnJump3Times'
          },
          {
            data: param.averageEarnBestReward,
            label: 'averageEarnBestReward'
          },
          {
            data: param.averageEarnJump3Times2x,
            label: 'averageEarnJump3Times2x'
          },
          {
            data: param.averageEarnJ3TGOBestReward,
            label: 'averageEarnJ3TGOBestReward'
          },
          {
            data: param.averageEarnFightWinLooseBR,
            label: 'averageEarnFightWinLooseBR'
          },
          {
            data: param.averageEarnOwnAdVIPReward,
            label: 'averageEarnOwnAdVIPReward'
          },


          {
            data: param.averageSpendClaimWithGemsPopup,
            label: 'averageSpendClaimWithGemsPopup'
          },
          {
            data: param.averageSpendNursery,
            label: 'averageSpendNursery'
          },
          {
            data: param.averageSpendProduct,
            label: 'averageSpendProduct'
          },
          {
            data: param.averageSpendProductLand,
            label: 'averageSpendProductLand'
          },
          {
            data: param.averageSpendRefillEnergy,
            label: 'averageSpendRefillEnergy'
          },
          {
            data: param.averageSpendOuter,
            label: 'averageSpendOuter'
          },
          {
            data: param.averageSpendFarm,
            label: 'averageSpendFarm'
          },
          {
            data: param.averageSpendSummonCard,
            label: 'averageSpendSummonCard'
          },
          {
            data: param.averageSpendClaimWithGems,
            label: 'averageSpendClaimWithGems'
          },
          {
            data: param.averageSpendChallenge9Summon,
            label: 'averageSpendChallenge9Summon'
          },
          {
            data: param.averageSpendProductEvolve,
            label: 'averageSpendProductEvolve'
          },
          {
            data: param.averageSpendBreedLab,
            label: 'averageSpendBreedLab'
          },
          {
            data: param.averageSpendTodaysOffer_BuyFood,
            label: 'averageSpendTodaysOffer_BuyFood'
          },
          {
            data: param.averageSpendTodaysOffer_BuyProduct,
            label: 'averageSpendTodaysOffer_BuyProduct'
          },
          {
            data: param.averageSpendTodaysOffer_BuyAll,
            label: 'averageSpendTodaysOffer_BuyAll'
          },
          {
            data: param.averageSpendDailyBonusProduct,
            label: 'averageSpendDailyBonusProduct'
          },
          {
            data: param.averageSpendJ3TBallShop,
            label: 'averageSpendJ3TBallShop'
          },
          {
            data: param.averageSpendDailyTaskSkip,
            label: 'averageSpendDailyTaskSkip'
          }];
        const temp: any[] = [];
        this.datasets.forEach((item: any) => {
          let flag = true;
          temp.push(item);
          const precision = 0.01;
          item.data.forEach((i: number) => {
            if (Math.abs(i) >= precision) {
              flag = false;
            }
          });
          if (flag) {
            temp.pop();
          } else {
            if (item.label.includes('Earn')) {
              // @ts-ignore
              this.legendDataforEarn.push(item.label);
              item.label = item.label.slice(7, 11) + ': ' + item.label.slice(11);
            } else {
              // @ts-ignore
              this.legendDataforSpend.push(item.label);
              item.label = item.label.slice(7, 12) + ': ' + item.label.slice(12);
            }

          }
        });
        this.datasets = [];
        temp.forEach((i) => {
          this.datasets.push(i);
          this.flagArray.push(true);
        });
      });
    this.chartType = 'bar';
    this.options = {
      layout: {
        padding: {
          left: 12
        }
      },
      responsive: false,
      scales: {
        yAxes: [{
          ticks: {
            display: true,
            maxRotation: 90,
            minRotation: 90,
            beginAtZero: true,
          },
          scaleLabel: {
            display: false
          },
          stacked: true,
          gridLines: {
            display: false
          }
        },
        ],
        xAxes: [{
          ticks: {
            maxRotation: 90,
            minRotation: 90
          },
          scaleLabel: {
            display: false,
            labelString: 'level'
          },
          stacked: true,
          gridLines: {
            display: false
          }
        },
          {
            type: 'category',
            offset: true,
            position: 'top',
            ticks: {
              fontColor: '#000000',
              fontStyle: 'bold',
              maxRotation: 90,
              minRotation: 90,
              callback: (value: any, index: any) => {
                let total = 0;
                this.datasets.forEach((item: { label: string | string[]; data: { [x: string]: any; }; }) => {
                  if (item.label.includes('Earn')) {
                    total += Number(item.data[index]);
                  }
                });
                this.maxPositiveValue = Math.max(total, this.maxPositiveValue);
                return total.toFixed(2);
              }
            }
          },
          {
            type: 'category',
            offset: true,
            position: 'below',
            ticks: {
              fontColor: '#000000',
              fontStyle: 'bold',
              maxRotation: 90,
              minRotation: 90,
              callback: (value: any, index: any, values: any) => {
                let total = 0;
                this.datasets.forEach((item: { label: string | string[]; data: { [x: string]: any; }; }) => {
                  if (item.label.includes('Spend')) {
                    total += Number(item.data[index]);
                  }
                });
                this.maxNegativeValue = Math.min(this.maxNegativeValue, total);
                return total.toFixed(2);
              }
            }
          }
        ]
      },
      plugins: {
        datalabels: {
          formatter: (value: any, ctx: any) => {
            // if (window.innerWidth < 1000) {
            //   return ' ';
            // }
            if (Number(value) * 100 / this.maxPositiveValue > 10 || Number(value) * 100 / this.maxNegativeValue > 10) {
              return Number(value).toFixed(0);
            }
            return '';
          },
          align: 'center',
          anchor: 'center',
          font: {
            weight: this.fontWeight
          },
          color: '#000000',
          rotation: -90
        }
      },
      legend: {
        position: this.legendPosition,
        labels: {
          usePointStyle: true,
        },
        // onClick: (e: any, legendItem: any, legend: any) => {
        //   // console.log(e);
        //   // console.log(e.target.__ngContext__[22][0]);
        //   // console.log(legendItem);
        //   // const ci = legend.chart;
        //   legendItem.hidden = !legendItem.hidden;
        //   console.log(this.datasets[legendItem.datasetIndex]);
        //   this.datasets[legendItem.datasetIndex]._meta[2].data.forEach((item: { hidden: boolean; }) => {
        //     item.hidden = true;
        //   });
        //   this.datasets[legendItem.datasetIndex]._meta[2].hidden = true;
        //   this.datasets[legendItem.datasetIndex]._meta[2].bar = false;
        //
        //   console.log(this.datasets[legendItem.datasetIndex]._meta[2].hidden);
        //   // this.datasets[legendItem.datasetIndex].hidden = legendItem.hidden;
        //   // ci.hide(legendItem.datasetIndex);
        //   // this.datasets.splice(legendItem.datasetIndex, 1);
        //   this.options.scales.xAxes[1].ticks.callback(1, 38);
        // }
      }
    };
  }
}

