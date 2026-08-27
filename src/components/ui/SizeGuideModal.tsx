import React from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose, category = 'clothing' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#FAF8F5] border border-[#E5E0D8] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E2D8] bg-[#F3EFEA]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#121212] text-amber-400 flex items-center justify-center">
              <Ruler className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-medium tracking-tight text-[#121212]">NICDEMUS Atelier Size Guide</h3>
              <p className="text-xs text-[#737373]">International conversion & exact body measurements</p>
            </div>
          </div>
          <button
            id="btn-close-size-guide"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 text-[#555555] hover:text-[#121212] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6 text-sm text-[#333333]">
          {/* Clothing Chart */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-[#888888] mb-3">Garments & Tailoring (CM / Inches)</h4>
            <div className="overflow-x-auto border border-[#E5E0D8] rounded-xl bg-white">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8F5F0] border-b border-[#E5E0D8] text-xs font-semibold text-[#121212]">
                    <th className="py-3 px-4">Size</th>
                    <th className="py-3 px-4">Bust / Chest</th>
                    <th className="py-3 px-4">Waist</th>
                    <th className="py-3 px-4">Hips</th>
                    <th className="py-3 px-4">EU / FR</th>
                    <th className="py-3 px-4">US / UK</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFECE6] text-xs">
                  <tr>
                    <td className="py-3 px-4 font-bold text-[#121212]">XS</td>
                    <td className="py-3 px-4">82–86 cm (32–34")</td>
                    <td className="py-3 px-4">64–68 cm (25–27")</td>
                    <td className="py-3 px-4">88–92 cm (34–36")</td>
                    <td className="py-3 px-4">34–36</td>
                    <td className="py-3 px-4">0–2 / 4–6</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-[#121212]">S</td>
                    <td className="py-3 px-4">86–92 cm (34–36")</td>
                    <td className="py-3 px-4">68–74 cm (27–29")</td>
                    <td className="py-3 px-4">92–98 cm (36–38")</td>
                    <td className="py-3 px-4">36–38</td>
                    <td className="py-3 px-4">4–6 / 8–10</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-[#121212]">M</td>
                    <td className="py-3 px-4">92–98 cm (36–38")</td>
                    <td className="py-3 px-4">74–80 cm (29–31")</td>
                    <td className="py-3 px-4">98–104 cm (38–41")</td>
                    <td className="py-3 px-4">38–40</td>
                    <td className="py-3 px-4">8–10 / 12–14</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-[#121212]">L</td>
                    <td className="py-3 px-4">98–106 cm (38–41")</td>
                    <td className="py-3 px-4">80–88 cm (31–34")</td>
                    <td className="py-3 px-4">104–112 cm (41–44")</td>
                    <td className="py-3 px-4">42–44</td>
                    <td className="py-3 px-4">12–14 / 16</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-[#121212]">XL</td>
                    <td className="py-3 px-4">106–114 cm (41–45")</td>
                    <td className="py-3 px-4">88–96 cm (34–38")</td>
                    <td className="py-3 px-4">112–120 cm (44–47")</td>
                    <td className="py-3 px-4">46–48</td>
                    <td className="py-3 px-4">16–18 / 18–20</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Footwear Chart */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-[#888888] mb-3">Footwear & Shoes Conversion</h4>
            <div className="overflow-x-auto border border-[#E5E0D8] rounded-xl bg-white">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8F5F0] border-b border-[#E5E0D8] text-xs font-semibold text-[#121212]">
                    <th className="py-3 px-4">EU</th>
                    <th className="py-3 px-4">UK</th>
                    <th className="py-3 px-4">US Men</th>
                    <th className="py-3 px-4">US Women</th>
                    <th className="py-3 px-4">Foot Length (CM)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFECE6] text-xs">
                  <tr><td className="py-2.5 px-4 font-bold">38</td><td className="py-2.5 px-4">5</td><td className="py-2.5 px-4">5.5</td><td className="py-2.5 px-4">7</td><td className="py-2.5 px-4">24.0 cm</td></tr>
                  <tr><td className="py-2.5 px-4 font-bold">39</td><td className="py-2.5 px-4">6</td><td className="py-2.5 px-4">6.5</td><td className="py-2.5 px-4">8</td><td className="py-2.5 px-4">24.7 cm</td></tr>
                  <tr><td className="py-2.5 px-4 font-bold">40</td><td className="py-2.5 px-4">6.5</td><td className="py-2.5 px-4">7.5</td><td className="py-2.5 px-4">9</td><td className="py-2.5 px-4">25.3 cm</td></tr>
                  <tr><td className="py-2.5 px-4 font-bold">41</td><td className="py-2.5 px-4">7.5</td><td className="py-2.5 px-4">8.5</td><td className="py-2.5 px-4">10</td><td className="py-2.5 px-4">26.0 cm</td></tr>
                  <tr><td className="py-2.5 px-4 font-bold">42</td><td className="py-2.5 px-4">8</td><td className="py-2.5 px-4">9</td><td className="py-2.5 px-4">10.5</td><td className="py-2.5 px-4">26.7 cm</td></tr>
                  <tr><td className="py-2.5 px-4 font-bold">43</td><td className="py-2.5 px-4">9</td><td className="py-2.5 px-4">10</td><td className="py-2.5 px-4">11.5</td><td className="py-2.5 px-4">27.3 cm</td></tr>
                  <tr><td className="py-2.5 px-4 font-bold">44</td><td className="py-2.5 px-4">10</td><td className="py-2.5 px-4">11</td><td className="py-2.5 px-4">12.5</td><td className="py-2.5 px-4">28.0 cm</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-[#FAF6EE] p-4 rounded-xl border border-[#E5DEC9] text-xs text-[#6B5A40] space-y-1">
            <p className="font-semibold text-[#483B28]">Atelier Fitting Advice:</p>
            <p>Our tailored coats and blazers are cut with a relaxed contemporary drop. If you prefer a traditional slim fit, we advise selecting one size down.</p>
          </div>
        </div>

        <div className="px-6 py-4 bg-[#F3EFEA] border-t border-[#E8E2D8] flex justify-end">
          <button
            id="btn-close-size-guide-footer"
            onClick={onClose}
            className="px-5 py-2.5 bg-[#121212] text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-[#2A2A2A] transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
