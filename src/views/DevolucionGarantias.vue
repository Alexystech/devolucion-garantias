<template>
  <v-container fluid>
    <v-row dense>
      <v-col sm="12">
        <v-card>
          <v-tabs horizontal align-with-title background-color="primary" dark>
            <v-tabs-slider color="red"></v-tabs-slider>
            <v-tab>
              <v-icon left>
                mdi-folder-multiple
              </v-icon>
              Todo
            </v-tab>
            <v-tab>
              <v-icon left>
                mdi-folder-check
              </v-icon>
              Recuperadas
            </v-tab>
            <v-tab>
              <v-icon left>
                mdi-folder-information
              </v-icon>
              No Recuperadas
            </v-tab>

            <!--TODOS-->
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-container>
                    <div v-if="todoBusquedaPor === 'Cliente'">
                      <v-row>
                        <v-col cols="12" md="2">
                          <v-autocomplete outlined dense hide-details
                                          v-model="todoBusquedaPor"
                                          :items="itemsBusqPor"
                                          label="Busqueda por"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="2">
                          <v-menu
                            ref="menuFechaInicio"
                            v-model="menuFechaInicio"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field outlined dense hide-details
                                            v-model="dateFechaInicio"
                                            label="Fecha Inicio"
                                            prepend-icon="mdi-calendar"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="dateFechaInicio"
                              :active-picker.sync="activePickerFechInicio"
                              :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                              min="1950-01-01"
                              @change="saveFechaInicio"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" md="2">
                          <v-menu
                            ref="menuFechaFin"
                            v-model="menuFechaFin"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field outlined dense hide-details
                                            v-model="dateFechaFin"
                                            label="Fecha Fin"
                                            prepend-icon="mdi-calendar"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="dateFechaFin"
                              :active-picker.sync="activePickerFechFin"
                              :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                              min="1950-01-01"
                              @change="saveFechaFin"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" md="2">
                          <v-autocomplete outlined dense hide-details clearable
                                          v-model="razonSocialTodo"
                                          :items="clientes"
                                          item-text="etiqueta"
                                          item-value="nIdClie07"
                                          return-object
                                          label="Busqueda por razon social"
                          />
                        </v-col>
                        <v-col cols="12" md="1">
                          <v-btn color="primary" elevation="1" absolute v-on:click="getGarantiasTodo">
                            <v-icon>
                              mdi-folder-search-outline
                            </v-icon>
                          </v-btn>
                        </v-col>
                        <v-col cols="12" md="1">
                          <v-btn color="primary" elevation="1" absolute>
                            <v-icon>
                              mdi-reload
                            </v-icon>
                          </v-btn>
                        </v-col>
                        <v-col cols="12" md="1">
                          <v-btn color="success" elevation="1" absolute v-on:click="exportarExcelTodoPorClie">
                            <v-icon>
                              mdi-file-excel-outline
                            </v-icon>
                            Exportar
                          </v-btn>
                        </v-col>
                      </v-row>
                      <div class="todoTable" v-if="garantiasTodo !== null">
                        <v-data-table
                          :headers="headersGarantiasTodo"
                          :items="garantiasTodo"
                          :items-per-page="5"
                          class="elevation-1"
                        ></v-data-table>
                      </div>
                    </div>
                    <div v-else>
                      <v-row>
                        <v-col cols="12" md="2">
                          <v-autocomplete outlined dense hide-details
                                          v-model="todoBusquedaPor"
                                          :items="itemsBusqPor"
                                          label="Busqueda por"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="2">
                          <v-text-field outlined dense hide-details
                                        v-model="referenciaTodo"
                                        label="Referencia"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="1">
                          <v-btn color="primary" elevation="1" absolute v-on:click="getGarantiasTodoPorReferencia">
                            <v-icon>
                              mdi-folder-search-outline
                            </v-icon>
                          </v-btn>
                        </v-col>
                        <v-col cols="12" md="1">
                          <v-btn color="primary" elevation="1" absolute>
                            <v-icon>
                              mdi-reload
                            </v-icon>
                          </v-btn>
                        </v-col>
                        <v-col cols="12" md="1">
                          <v-btn color="success" elevation="1" absolute v-on:click="exportarExcelTodoPorReferencia">
                            <v-icon>
                              mdi-file-excel-outline
                            </v-icon>
                            Exportar
                          </v-btn>
                        </v-col>
                      </v-row>
                      <div class="todoTable" v-if="garantiasPorReferencia !== null">
                        <v-data-table
                          :headers="headersGarantiasTodo"
                          :items="garantiasPorReferencia"
                          :items-per-page="5"
                          class="elevation-1"
                        ></v-data-table>
                      </div>
                    </div>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <!--RECUPERADOS-->
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-container>
                    <div v-if="recuperadoBusquedaPor === 'Cliente'">
                      <v-row>
                        <v-col cols="12" md="2">
                          <v-autocomplete outlined dense hide-details
                            v-model="recuperadoBusquedaPor"
                            :items="itemsBusqPor"
                            label="Busqueda por"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="2">
                          <v-menu
                            ref="recMenuFechaInicio"
                            v-model="recMenuFechaInicio"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field outlined dense hide-details
                                v-model="recFechaInicio"
                                label="Fecha Inicio"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="recFechaInicio"
                              :active-picker.sync="recActivePickFechInicio"
                              :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                              min="1950-01-01"
                              @change="saveFechaInicioRec"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" md="2">
                          <v-menu
                            ref="recMenuFechaFinal"
                            v-model="recMenuFechaFinal"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field outlined dense hide-details
                                v-model="recFechaFin"
                                label="Fecha Fin"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="recFechaFin"
                              :active-picker.sync="recActivePickFechFin"
                              :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                              min="1950-01-01"
                              @change="saveFechaFinRec"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" md="2">
                          <v-autocomplete outlined dense hide-details clearable
                                          v-model="razonSocialRec"
                                          :items="clientes"
                                          item-text="etiqueta"
                                          item-value="nIdClie07"
                                          return-object
                                          label="Busqueda por razon social"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="1">
                          <v-btn color="primary" elevation="1" absolute v-on:click="findAll">
                            <v-icon>
                              mdi-folder-search-outline
                            </v-icon>
                          </v-btn>
                        </v-col>
                        <v-col cols="12" md="1">
                          <v-btn color="primary" elevation="1" absolute>
                            <v-icon>
                              mdi-reload
                            </v-icon>
                          </v-btn>
                        </v-col>
                        <v-col cols="12" md="1">
                          <v-btn color="success" elevation="1" absolute>
                            <v-icon>
                              mdi-file-excel-outline
                            </v-icon>
                            Exportar
                          </v-btn>
                        </v-col>
                      </v-row>
                      <!--TABLA-->
                      <div class="todoTable">
                        <v-simple-table
                          fixed-header
                          height="100%"
                        >
                          <template v-slot:default>
                            <thead>
                            <tr>
                              <th class="text-left">
                                Sucursal
                              </th>
                              <th class="text-left">
                                Fecha Aper
                              </th>
                              <th class="text-left">
                                Fecha Rec
                              </th>
                              <th class="text-left">
                                Clave
                              </th>
                              <th class="text-left">
                                Cliente
                              </th>
                              <th class="text-left">
                                Referencia
                              </th>
                              <th class="text-left">
                                Saldo P/Nav
                              </th>
                              <th class="text-left">
                                Saldo Dev/Nav
                              </th>
                              <th class="text-left">
                                Saldo Financiado
                              </th>
                              <th class="text-left">
                                Saldo Cliente
                              </th>
                              <th class="text-left">
                                Fecha Dev
                              </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                              v-for="item in garantiasTodoRec"
                              :key="item.id"
                            >
                              <td>{{ item.sucursal }}</td>
                              <td>{{ item.fechaAper }}</td>
                              <td>{{ item.fechaRec }}</td>
                              <td>{{ item.clave }}</td>
                              <td>{{ item.cliente }}</td>
                              <td>{{ item.referencia }}</td>
                              <td>{{ item.saldoPNav }}</td>
                              <td>{{ item.saldoDevNav }}</td>
                              <td>{{ item.saldoFinan }}</td>
                              <td>{{ item.saldoCliente }}</td>
                              <td>{{ item.fechaDev }}</td>
                            </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </div>
                    </div>
                    <div v-else>
                      <v-row>
                        <v-col cols="12" md="2">
                          <v-autocomplete outlined dense hide-details
                            v-model="recuperadoBusquedaPor"
                            :items="itemsBusqPor"
                            label="Busqueda por"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="2">
                          <v-text-field outlined dense hide-details
                            label="Referencia"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="1">
                          <v-btn color="primary" elevation="1" absolute v-on:click="findAll">
                            <v-icon>
                              mdi-folder-search-outline
                            </v-icon>
                          </v-btn>
                        </v-col>
                        <v-col cols="12" md="1">
                          <v-btn color="primary" elevation="1" absolute>
                            <v-icon>
                              mdi-reload
                            </v-icon>
                          </v-btn>
                        </v-col>
                        <v-col cols="12" md="1">
                          <v-btn color="success" elevation="1" absolute>
                            <v-icon>
                              mdi-file-excel-outline
                            </v-icon>
                            Exportar
                          </v-btn>
                        </v-col>
                      </v-row>
                      <div class="todoTable">
                        <v-simple-table
                          fixed-header
                          height="100%"
                        >
                          <template v-slot:default>
                            <thead>
                            <tr>
                              <th class="text-left">
                                Sucursal
                              </th>
                              <th class="text-left">
                                Fecha Aper
                              </th>
                              <th class="text-left">
                                Fecha Rec
                              </th>
                              <th class="text-left">
                                Clave
                              </th>
                              <th class="text-left">
                                Cliente
                              </th>
                              <th class="text-left">
                                Referencia
                              </th>
                              <th class="text-left">
                                Saldo P/Nav
                              </th>
                              <th class="text-left">
                                Saldo Dev/Nav
                              </th>
                              <th class="text-left">
                                Saldo Financiado
                              </th>
                              <th class="text-left">
                                Saldo Cliente
                              </th>
                              <th class="text-left">
                                Fecha Dev
                              </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                              v-for="item in garantiasPorReferenciaRec"
                              :key="item.id"
                            >
                              <td>{{ item.sucursal }}</td>
                              <td>{{ item.fechaAper }}</td>
                              <td>{{ item.fechaRec }}</td>
                              <td>{{ item.clave }}</td>
                              <td>{{ item.cliente }}</td>
                              <td>{{ item.referencia }}</td>
                              <td>{{ item.saldoPNav }}</td>
                              <td>{{ item.saldoDevNav }}</td>
                              <td>{{ item.saldoFinan }}</td>
                              <td>{{ item.saldoCliente }}</td>
                              <td>{{ item.fechaDev }}</td>
                            </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </div>
                    </div>
                  </v-container>
                </v-card-text>
              </v-card>
              <v-card>
                <v-card-text>
                  {{ recFechaInicio }} / {{ recFechaFin }}
                  {{ razonSocialRec }}
                </v-card-text>
              </v-card>
            </v-tab-item>
            <!--NO RECUPERADOS-->
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-container>
                    <div v-if="noRecupBusquedaPor === 'Cliente'">
                      <v-row>
                        <v-col cols="12" md="2">
                          <v-autocomplete outlined dense hide-details
                            v-model="noRecupBusquedaPor"
                            :items="itemsBusqPor"
                            label="Busqueda por"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="2">
                          <v-menu
                            ref="noRecMenuFechaIni"
                            v-model="noRecMenuFechaIni"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field outlined dense hide-details
                                v-model="noRecFechaInicio"
                                label="Fecha Inicio"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="noRecFechaInicio"
                              :active-picker.sync="noRecActivePickFechInicio"
                              :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                              min="1950-01-01"
                              @change="saveFechaInicioNoRec"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" md="2">
                          <v-menu
                            ref="noRecMenuFechaFin"
                            v-model="noRecMenuFechaFin"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field outlined dense hide-details
                                v-model="noRecFechaFin"
                                label="Fecha Fin"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="noRecFechaFin"
                              :active-picker.sync="noRecActivePickFechFin"
                              :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                              min="1950-01-01"
                              @change="saveFechaFinNoRec"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" md="2">
                          <v-autocomplete outlined dense hide-details clearable
                                          v-model="razonSocialNoRec"
                                          :items="clientes"
                                          item-text="etiqueta"
                                          item-value="nIdClie07"
                                          return-object
                                          label="Busqueda por razon social"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="1">
                          <v-btn color="primary" elevation="1" absolute v-on:click="findAll">
                            <v-icon>
                              mdi-folder-search-outline
                            </v-icon>
                          </v-btn>
                        </v-col>
                        <v-col cols="12" md="1">
                          <v-btn color="primary" elevation="1" absolute>
                            <v-icon>
                              mdi-reload
                            </v-icon>
                          </v-btn>
                        </v-col>
                        <v-col cols="12" md="1">
                          <v-btn color="success" elevation="1" absolute>
                            <v-icon>
                              mdi-file-excel-outline
                            </v-icon>
                            Exportar
                          </v-btn>
                        </v-col>
                      </v-row>
                      <div class="todoTable">
                        <v-simple-table
                          fixed-header
                          height="100%"
                        >
                          <template v-slot:default>
                            <thead>
                            <tr>
                              <th class="text-left">
                                Sucursal
                              </th>
                              <th class="text-left">
                                Fecha Aper
                              </th>
                              <th class="text-left">
                                Clave
                              </th>
                              <th class="text-left">
                                Cliente
                              </th>
                              <th class="text-left">
                                Referencia
                              </th>
                              <th class="text-left">
                                Saldo P/Nav
                              </th>
                              <th class="text-left">
                                Saldo Financiado
                              </th>
                              <th class="text-left">
                                Saldo Cliente
                              </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                              v-for="item in garantiasTodoNoRec"
                              :key="item.id"
                            >
                              <td>{{ item.sucursal }}</td>
                              <td>{{ item.fechaAper }}</td>
                              <td>{{ item.clave }}</td>
                              <td>{{ item.cliente }}</td>
                              <td>{{ item.referencia }}</td>
                              <td>{{ item.saldoPNav }}</td>
                              <td>{{ item.saldoFinan }}</td>
                              <td>{{ item.saldoCliente }}</td>
                            </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </div>
                    </div>
                    <div v-else>
                      <v-row>
                        <v-col cols="12" md="2">
                          <v-autocomplete outlined dense hide-details
                            v-model="noRecupBusquedaPor"
                            :items="itemsBusqPor"
                            label="Busqueda por"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="2">
                          <v-text-field outlined dense hide-details
                            label="Referencia"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="1">
                          <v-btn color="primary" elevation="1" absolute v-on:click="findAll">
                            <v-icon>
                              mdi-folder-search-outline
                            </v-icon>
                          </v-btn>
                        </v-col>
                        <v-col cols="12" md="1">
                          <v-btn color="primary" elevation="1" absolute>
                            <v-icon>
                              mdi-reload
                            </v-icon>
                          </v-btn>
                        </v-col>
                        <v-col cols="12" md="1">
                          <v-btn color="success" elevation="1" absolute>
                            <v-icon>
                              mdi-file-excel-outline
                            </v-icon>
                            Exportar
                          </v-btn>
                        </v-col>
                      </v-row>
                      <div class="todoTable">
                        <v-simple-table
                          fixed-header
                          height="100%"
                        >
                          <template v-slot:default>
                            <thead>
                            <tr>
                              <th class="text-left">
                                Sucursal
                              </th>
                              <th class="text-left">
                                Fecha Aper
                              </th>
                              <th class="text-left">
                                Clave
                              </th>
                              <th class="text-left">
                                Cliente
                              </th>
                              <th class="text-left">
                                Referencia
                              </th>
                              <th class="text-left">
                                Saldo P/Nav
                              </th>
                              <th class="text-left">
                                Saldo Financiado
                              </th>
                              <th class="text-left">
                                Saldo Cliente
                              </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                              v-for="item in garantiasPorReferenciaNoRec"
                              :key="item.id"
                            >
                              <td>{{ item.sucursal }}</td>
                              <td>{{ item.fechaAper }}</td>
                              <td>{{ item.clave }}</td>
                              <td>{{ item.cliente }}</td>
                              <td>{{ item.referencia }}</td>
                              <td>{{ item.saldoPNav }}</td>
                              <td>{{ item.saldoFinan }}</td>
                              <td>{{ item.saldoCliente }}</td>
                            </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </div>
                    </div>
                  </v-container>
                </v-card-text>
              </v-card>
              <v-card>
                <v-card-text>
                  {{ noRecFechaInicio }} / {{ noRecFechaFin }}
                  {{ razonSocialNoRec }}
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'DevolucionGarantias',
  title: 'Devolucion de Garantias',
  mounted () {
    this.getClientes()
  },
  components: {
  },
  data: () => ({
    itemsBusqPor: [
      'Cliente',
      'Referencia'
    ],
    referenciaTodo: '',
    referenciaRec: '',
    referenciaNoRec: '',
    clientes: [],
    activePickerFechInicio: '',
    activePickerFechFin: '',
    recActivePickFechInicio: '',
    recActivePickFechFin: '',
    noRecActivePickFechInicio: '',
    noRecActivePickFechFin: '',
    dateFechaInicio: '',
    dateFechaFin: '',
    recFechaInicio: '',
    recFechaFin: '',
    noRecFechaInicio: '',
    noRecFechaFin: '',
    menuFechaInicio: false,
    menuFechaFin: false,
    recMenuFechaInicio: false,
    recMenuFechaFinal: false,
    noRecMenuFechaIni: false,
    noRecMenuFechaFin: false,
    todoBusquedaPor: 'Cliente',
    recuperadoBusquedaPor: 'Cliente',
    noRecupBusquedaPor: 'Cliente',
    razonSocialTodo: '',
    razonSocialRec: '',
    razonSocialNoRec: '',
    itemsRazonSocialTodo: [],
    itemsRazonSocialRec: [],
    itemsRazonSocialNoRec: [],
    headersGarantiasTodo: [
      {
        text: 'Sucursal',
        align: 'start',
        sortable: false,
        value: 's_Sucursal'
      },
      {
        text: 'Fecha Aper',
        value: 's_FechaAperturaReferencia'
      },
      {
        text: 'Fecha Rec',
        value: 's_FechaRecuperacionGarantia'
      },
      {
        text: 'Clave',
        sortable: false,
        value: 's_Clave'
      },
      {
        text: 'Cliente',
        sortable: false,
        value: 's_Cliente'
      },
      {
        text: 'Referencia',
        value: 's_Referencia'
      },
      {
        text: 'Saldo P/Nav',
        value: 's_SaldoPagANavi'
      },
      {
        text: 'Saldo Dev/Nav',
        value: 's_SaldoDevPorNavi'
      },
      {
        text: 'Saldo financiado',
        value: 'm_SaldoFinanciado'
      },
      {
        text: 'Saldo Cliente',
        value: 'm_SaldoCliente'
      },
      {
        text: 'Fecha Dev',
        value: 's_FechaDev'
      },
      {
        text: 'Estatus',
        value: 's_Estatus'
      }
    ],
    garantiasTodo: null,
    garantiasPorReferencia: null,
    headersGarantiasRecup: [],
    garantiasTodoRec: [],
    garantiasPorReferenciaRec: [],
    headersGarantiasNoRec: [],
    garantiasTodoNoRec: [],
    garantiasPorReferenciaNoRec: []
  }),
  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePickerFechInicio = 'YEAR'))
    },
    menuFin (val) {
      val && setTimeout(() => (this.activePickerFechFin = 'YEAR'))
    }
  },
  methods: {
    saveFechaInicio (date) {
      this.$refs.menuFechaInicio.save(date)
    },
    saveFechaFin (date) {
      this.$refs.menuFechaFin.save(date)
    },
    saveFechaInicioRec (date) {
      this.$refs.recMenuFechaInicio.save(date)
    },
    saveFechaFinRec (date) {
      this.$refs.recMenuFechaFinal.save(date)
    },
    saveFechaInicioNoRec (date) {
      this.$refs.noRecMenuFechaIni.save(date)
    },
    saveFechaFinNoRec (date) {
      this.$refs.noRecMenuFechaFin.save(date)
    },
    findAll () {
      console.log(this.dateFechaInicio + ' / ' + this.dateFechaFin)
    },
    async getClientes () {
      await this.$axios.get(`${this.$service}devolucion_garantias/api/clientes`)
        .then(res => {
          this.clientes = res.data.data.map(cliente => {
            cliente.etiqueta = `${cliente.sClave}` + ' - ' + `${cliente.sRazonSocial}`
            return cliente
          })
        })
    },
    async getGarantiasTodo () {
      await this.$axios.get(`${this.$service}devolucion_garantias/api/todo/cliente/${this.razonSocialTodo.nIdClie07}/${this.dateFechaInicio}/${this.dateFechaFin}`)
        .then(res => {
          this.garantiasTodo = res.data.data
        })
    },
    async getGarantiasTodoPorReferencia () {
      await this.$axios.get(`${this.$service}devolucion_garantias/api/todo/referencia/${this.referenciaTodo}`)
        .then(res => {
          this.garantiasPorReferencia = res.data.data
        })
    },
    exportarExcelTodoPorClie () {
      this.$axios.get(`${this.$service}devolucion_garantias/api/export/excel/todo/cliente/${this.razonSocialTodo.nIdClie07}/${this.dateFechaInicio}/${this.dateFechaFin}`)
        .then(res => {
          if (res.data.result === true) {
            this.$goToUrl(res.data.data)
          }
        })
    },
    exportarExcelTodoPorReferencia () {
      this.$axios.get(`${this.$service}devolucion_garantias/api/export/excel/todo/referencia/${this.referenciaTodo}`)
        .then(res => {
          if (res.data.result === true) {
            this.$goToUrl(res.data.data)
          }
        })
    }
  }
}
</script>

<style scoped>
.head-table {
  background-color: #002157;
  color: white;
}
</style>
