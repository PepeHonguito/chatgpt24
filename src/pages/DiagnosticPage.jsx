import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const DiagnosticPage = () => {
  const [chargingIndication, setChargingIndication] = useState('yes');
  const [usbValue, setUsbValue] = useState('1.0');
  const [bootScreen, setBootScreen] = useState(true);
  const [logoOnly, setLogoOnly] = useState(false);
  const [deviceReaction, setDeviceReaction] = useState(false);
  const [touchWorks, setTouchWorks] = useState(true);
  const [signalWorking, setSignalWorking] = useState(true);
  const [wifiIssue, setWifiIssue] = useState('ok');
  const [cameraFocus, setCameraFocus] = useState(true);
  const [report, setReport] = useState('');

  const generateReport = () => {
    let rep = 'Informe de Control de Calidad\n';
    rep += 'Carga:\n';
    if (chargingIndication === 'no') {
      rep += '- No carga.\n';
    } else {
      const val = parseFloat(usbValue);
      if (val >= 1.0) {
        rep += '- Carga normalmente.\n';
      } else if (val >= 0.5 && val <= 0.6) {
        rep += '- Carga lento.\n';
      } else if (val === 0) {
        rep += '- Carga falsa. No carga.\n';
      } else {
        rep += '- No carga.\n';
      }
    }

    rep += '\nEncendido:\n';
    if (bootScreen) {
      rep += '- Inicia normalmente.\n';
    } else if (logoOnly) {
      rep += '- No inicia.\n';
    } else if (deviceReaction) {
      rep += '- No da imagen.\n';
    } else {
      rep += '- No enciende.\n';
    }

    rep += '\nT\u00e1ctil:\n';
    rep += touchWorks ? '- Funciona correctamente.\n' : '- Falla el t\u00e1ctil.\n';

    rep += '\nSe\u00f1al/Sonido/Micr\u00f3fono:\n';
    rep += signalWorking ? '- Funcionan correctamente.\n' : '- Falla de se\u00f1al/sonido/micr\u00f3fono.\n';

    rep += '\nWi-fi / Bluetooth:\n';
    if (wifiIssue === 'ok') rep += '- Funcionan correctamente.\n';
    if (wifiIssue === 'no-enciende') rep += '- Falla IC de Wi-fi/Bluetooth.\n';
    if (wifiIssue === 'baja-intensidad') rep += '- Falla antena Wi-fi/Bluetooth.\n';
    if (wifiIssue === 'sin-internet') rep += '- Software o IC de Wi-fi/Bluetooth.\n';

    rep += '\nC\u00e1maras:\n';
    rep += cameraFocus ? '- Enfocan bien.\n' : '- Falla c\u00e1mara.\n';

    setReport(rep);
  };

  const copyReport = () => {
    navigator.clipboard.writeText(report);
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-slate-100 to-blue-100">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-6">
        <h1 className="text-2xl font-bold text-center">Control de Calidad</h1>
        <div>
          <Label className="mb-1 block">\u00bfMuestra indicios de carga?</Label>
          <select
            className="mt-1 w-full border rounded-md p-2"
            value={chargingIndication}
            onChange={e => setChargingIndication(e.target.value)}
          >
            <option value="yes">S\u00ed</option>
            <option value="no">No</option>
          </select>
        </div>
        {chargingIndication === 'yes' && (
          <div>
            <Label className="mb-1 block">Valor en TesterUSB (A)</Label>
            <Input type="number" step="0.1" value={usbValue} onChange={e => setUsbValue(e.target.value)} />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="mb-1 block">\u00bfMuestra pantalla de desbloqueo?</Label>
            <input type="checkbox" checked={bootScreen} onChange={e => setBootScreen(e.target.checked)} />
          </div>
          <div>
            <Label className="mb-1 block">\u00bfSolo queda en el logo?</Label>
            <input type="checkbox" checked={logoOnly} onChange={e => setLogoOnly(e.target.checked)} />
          </div>
          <div>
            <Label className="mb-1 block">Reacciona (vibraci\u00f3n/sonido)</Label>
            <input type="checkbox" checked={deviceReaction} onChange={e => setDeviceReaction(e.target.checked)} />
          </div>
        </div>
        <div>
          <Label className="mb-1 block">\u00bfT\u00e1ctil responde en toda la pantalla?</Label>
          <input type="checkbox" checked={touchWorks} onChange={e => setTouchWorks(e.target.checked)} />
        </div>
        <div>
          <Label className="mb-1 block">\u00bfSe\u00f1al, sonido y micr\u00f3fono funcionan?</Label>
          <input type="checkbox" checked={signalWorking} onChange={e => setSignalWorking(e.target.checked)} />
        </div>
        <div>
          <Label className="mb-1 block">Estado Wi-fi/Bluetooth</Label>
          <select
            className="mt-1 w-full border rounded-md p-2"
            value={wifiIssue}
            onChange={e => setWifiIssue(e.target.value)}
          >
            <option value="ok">Funciona</option>
            <option value="no-enciende">No enciende / no encuentra</option>
            <option value="baja-intensidad">Baja intensidad</option>
            <option value="sin-internet">Se conecta sin internet</option>
          </select>
        </div>
        <div>
          <Label className="mb-1 block">\u00bfC\u00e1maras enfocan bien?</Label>
          <input type="checkbox" checked={cameraFocus} onChange={e => setCameraFocus(e.target.checked)} />
        </div>
        <Button onClick={generateReport} className="w-full">Generar Informe</Button>
        {report && (
          <div>
            <Textarea readOnly value={report} className="mt-4" />
            <Button variant="outline" onClick={copyReport} className="mt-2">Copiar</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagnosticPage;
